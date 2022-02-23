from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from server.dao.database import Base


class PolicyDetails(Base):
    __tablename__ = "policy_details"

    policy_id = Column(Integer, primary_key=True, index=True)
    customer_id = Column(Integer, ForeignKey("customer_details.customer_id"))


class CustomerDetails(Base):
    __tablename__ = "customer_details"

    customer_id = Column(Integer, primary_key=True, index=True)
    gender = Column(String, index=True)
    marital_status = Column(String, index=True)

    policies = relationship("PolicyDetails", back_populates="customer_id")

