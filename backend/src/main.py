from typing import Optional, List
from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
# Ensure all necessary components from your scraper are imported
from tokopaedi import search, get_product, get_reviews, SearchFilters

app = FastAPI(title="Tokopedia Scraper API")

# Define the allowed origins for CORS (your frontend's address)
origins = [
    "http://localhost:3000",
]

# Add the CORS middleware to your FastAPI application
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all HTTP methods
    allow_headers=["*"], # Allows all request headers
)

@app.get("/")
def read_root():
    """A simple root endpoint to confirm the API is running."""
    return {"message": "Tokopaedi Scraper API"}

@app.get("/search/{keyword}")
def search_products(
    keyword: str,
    max_result: int = 10,
    # Define all query parameters with defaults and aliases for the frontend
    min_price: int = Query(0, alias="minPrice"),
    max_price: int = Query(0, alias="maxPrice"),
    rating: float = Query(0.0, alias="rt"),
    condition: int = Query(0),
    latest_product: int = Query(0, alias="latestProduct"),
    shop_tier: Optional[str] = Query(None, alias="shopTier"),
    bebas_ongkir_extra: bool = Query(False, alias="bebasOngkirExtra"),
    is_discount: bool = Query(False, alias="isDiscount"),
    is_fulfillment: bool = Query(False, alias="isFulfillment"),
    is_plus: bool = Query(False, alias="isPlus"),
    cod: bool = Query(False),
):
    """
    Handles product searches with a comprehensive set of advanced filters.
    Includes error handling for scraper failures.
    """
    try:
        # Dynamically build a dictionary of filters
        filter_args = {}
        if min_price > 0:
            filter_args['pmin'] = min_price
        if max_price > 0:
            filter_args['pmax'] = max_price
        if rating > 0:
            filter_args['rt'] = rating
        if condition > 0:
            filter_args['condition'] = condition
        if latest_product > 0:
            filter_args['latest_product'] = latest_product
        if shop_tier:
            filter_args['shop_tier'] = [int(tier) for tier in shop_tier.split(',')]
        if bebas_ongkir_extra:
            filter_args['bebas_ongkir_extra'] = bebas_ongkir_extra
        if is_discount:
            filter_args['is_discount'] = is_discount
        if is_fulfillment:
            filter_args['is_fulfillment'] = is_fulfillment
        if is_plus:
            filter_args['is_plus'] = is_plus
        if cod:
            filter_args['cod'] = cod

        filters = SearchFilters(**filter_args)

        results = search(
            keyword,
            max_result=max_result,
            filters=filters
        )
        
        if not results:
            return {[]}

        # --- FIX: Robustly handle inconsistent return types ---
        data = results.json()
        if isinstance(data, str):
            parsed_results = json.loads(data)
        else:
            parsed_results = data # Assume it's already a dict/list
        
        # print(f"DEBUG: Data being sent to frontend: {json.dumps(parsed_results, indent=2)}")
        
        return parsed_results
    except Exception as e:
        print(f"An error occurred during search: {e}")
        raise HTTPException(
            status_code=503,
            detail="The scraping service is currently unavailable or failed. Please try again later."
        )


@app.get("/product/{product_id}")
def get_product_details(product_id: int):
    """
    Gets detailed information for a single product.
    Includes error handling.
    """
    try:
        product_data = get_product(product_id=product_id)
        if not product_data:
            raise HTTPException(status_code=404, detail="Product not found.")
        
        # FIX: Robustly handle inconsistent return types
        data = product_data.json()
        if isinstance(data, str):
            return json.loads(data)
        return data
    except Exception as e:
        print(f"An error occurred getting product {product_id}: {e}")
        raise HTTPException(
            status_code=503,
            detail="Could not retrieve product details at this time."
        )


@app.get("/reviews/{product_id}")
def get_product_reviews(product_id: int, max_result: int = 20):
    """
    Gets reviews for a single product.
    Includes error handling.
    """
    try:
        reviews = get_reviews(product_id=product_id, max_result=max_result)
        if reviews is None:
             return []
        
        # FIX: Robustly handle inconsistent return types
        final_reviews = []
        for review in reviews:
            data = review.json()
            if isinstance(data, str):
                final_reviews.append(json.loads(data))
            else:
                final_reviews.append(data)
        return final_reviews
    except Exception as e:
        print(f"An error occurred getting reviews for {product_id}: {e}")
        raise HTTPException(
            status_code=503,
            detail="Could not retrieve product reviews at this time."
        )
