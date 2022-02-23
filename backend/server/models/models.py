from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Date
from sqlalchemy.orm import relationship

from server.dao.database import Base

class PolicyDetails(Base):
    __tablename__ = "policy_details"
    __table_args__ = {'extend_existing': True} 

    policy_id = Column(Integer, primary_key=True)
    date_of_purchase = Column(Date)
    customer_id = Column(Integer, ForeignKey("customer_details.customer_id"), index=True)
    fuel = Column(String)
    vehicle_segment = Column(String)
    premium = Column(Integer)
    body_injury_liability = Column(Integer)
    personal_injury_protection = Column(Integer)
    collision = Column(Integer)
    comprehensive = Column(Integer)


class CustomerDetails(Base):
    __tablename__ = "customer_details"
    __table_args__ = {'extend_existing': True} 

    customer_id = Column(Integer, primary_key=True)
    customer_gender = Column(String)
    customer_income_group = Column(String)
    customer_region = Column(String)
    customer_marital_status = Column(String)

    customer_policies = relationship("PolicyDetails", backref="customer")


