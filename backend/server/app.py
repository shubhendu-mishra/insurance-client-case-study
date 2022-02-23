from typing import List
from fastapi import Depends, FastAPI, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from server.models import  models, schemas
from server.dao import policy_crud
from server.dao.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3011",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/create_policy/", response_model=schemas.PolicyDetails)
def create_policy(policy: schemas.PolicyDetailsCreate, db: Session = Depends(get_db)):
    return policy_crud.create_policy(db=db, policy=policy)

@app.post("/update_policy/", response_model=schemas.PolicyCustomerDetails)
def update_policy(policy: schemas.PolicyCustomerDetails, db: Session = Depends(get_db)):
    db_policy = policy_crud.get_policy_by_policy_id(db, policy_id=policy.PolicyDetails.policy_id)
    if not db_policy:
        raise HTTPException(status_code=404, detail="Policy with given ID not found")
    policy_crud.update_policy(db=db, policy=policy.PolicyDetails)
    policy_crud.update_customer(db=db, customer=policy.CustomerDetails)
    policy = policy_crud.get_policy_by_policy_id(db, policy_id=policy.PolicyDetails.policy_id)
    return policy

@app.get("/get_policy_by_policy_id/", response_model=schemas.PolicyCustomerDetails)
def get_policy_by_policy_id(policy_id: int = 0, db: Session = Depends(get_db)):
    policy = policy_crud.get_policy_by_policy_id(db, policy_id=policy_id)
    return policy

@app.get("/get_policy_by_customer_id/")
def get_policy_by_customer_id(customer_id: int = 0, db: Session = Depends(get_db)):
    policies = policy_crud.get_policies_by_customer_id(db, customer_id=customer_id)
    return policies

@app.get("/search_policy_by_policy_id/", response_model=List[schemas.PolicyDetails])
def get_policy_by_customer_id(policy_id: int = 0, db: Session = Depends(get_db)):
    policies = policy_crud.search_policy_by_policy_id(db, policy_id=policy_id)
    return policies

@app.get("/search_policy_by_customer_id/", response_model=List[schemas.PolicyDetails])
def get_policy_by_customer_id(customer_id: int = 0, db: Session = Depends(get_db)):
    policies = policy_crud.search_policy_by_customer_id(db, customer_id=customer_id)
    return policies

@app.get("/get_policy_stats_by_year/")
def get_policy_stats_by_year(year: int = 0, db: Session = Depends(get_db)):
    policies = policy_crud.policy_stats_by_year(db, year=year)
    return policies