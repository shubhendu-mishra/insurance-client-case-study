from datetime import date
from typing import Optional

from pydantic import BaseModel


class PolicyDetailsBase(BaseModel):
    date_of_purchase: Optional[date]
    customer_id: Optional[int]
    fuel: Optional[str]
    vehicle_segment: Optional[str]
    premium: Optional[str]
    body_injury_liability: Optional[str]
    personal_injury_protection: Optional[str]
    collision: Optional[str]
    comprehensive: Optional[str]
    property_damage_liability: Optional[str]

class PolicyDetailsCreate(PolicyDetailsBase):
    pass


class PolicyDetails(PolicyDetailsBase):
    policy_id: int

    class Config:
        orm_mode = True


class CustomerDetails(BaseModel):
    customer_gender: Optional[str]
    customer_income_group: Optional[str]
    customer_region: Optional[str]
    customer_marital_status: Optional[str]

class CustomerCreate(CustomerDetails):
    pass

class Customer(CustomerDetails):
    customer_id: int
    policies: list[PolicyDetails] = []

    class Config:
        orm_mode = True

class PolicyCustomerDetails(BaseModel):
    PolicyDetails: PolicyDetails
    CustomerDetails: Customer

    class Config:
        orm_mode = True