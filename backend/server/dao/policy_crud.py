from operator import mod
from sqlalchemy.orm import Session
from sqlalchemy import extract, func
from server.models import models, schemas

def get_policy_by_policy_id(db: Session, policy_id: int):
    return db.query(models.PolicyDetails, models.CustomerDetails).join(models.CustomerDetails).filter(models.PolicyDetails.policy_id == policy_id).first()

def get_policies_by_customer_id(db: Session, customer_id: int):
    return db.query(models.PolicyDetails, models.CustomerDetails).join(models.CustomerDetails).filter(models.PolicyDetails.customer_id == int(customer_id)).all()

def search_policy_by_policy_id(db: Session, policy_id: int):
    return db.query(models.PolicyDetails).filter(models.PolicyDetails.policy_id.like(str(policy_id) + '%')).all()

def search_policy_by_customer_id(db: Session, customer_id: int):
    return db.query(models.PolicyDetails).filter(models.PolicyDetails.customer_id.like(str(customer_id) + '%')).all()

def policy_stats_by_year(db: Session, year: int):
    return db.query(models.CustomerDetails.customer_region, \
        extract('year', models.PolicyDetails.date_of_purchase).label("year"), extract('month', models.PolicyDetails.date_of_purchase).label("month"), func.count(models.PolicyDetails.policy_id).label("count")).\
            join(models.CustomerDetails).group_by(models.CustomerDetails.customer_region,  extract('year', models.PolicyDetails.date_of_purchase), extract('month', models.PolicyDetails.date_of_purchase),)\
                .filter(extract('year', models.PolicyDetails.date_of_purchase) == str(year)).all()

def create_policy(db: Session, policy: schemas.PolicyDetailsCreate):
    db_policy = models.PolicyDetails(date_of_purchase="2018")
    db.add(db_policy)
    db.commit()
    db.refresh(db_policy)
    return db_policy

def update_policy(db: Session, policy: schemas.PolicyDetails):
    db_policy = db.query(models.PolicyDetails).filter(models.PolicyDetails.policy_id == policy.policy_id).update({models.PolicyDetails.policy_id\
        : policy.policy_id, models.PolicyDetails.date_of_purchase:policy.date_of_purchase, models.PolicyDetails.customer_id:policy.customer_id\
            , models.PolicyDetails.fuel:policy.fuel, models.PolicyDetails.vehicle_segment:policy.vehicle_segment,\
                 models.PolicyDetails.premium:policy.premium, models.PolicyDetails.body_injury_liability:policy.body_injury_liability,\
                      models.PolicyDetails.personal_injury_protection:policy.personal_injury_protection,\
                           models.PolicyDetails.collision:policy.collision, models.PolicyDetails.comprehensive:policy.comprehensive},\
                                synchronize_session=False)

    db_policy = db.query(models.PolicyDetails).filter(models.PolicyDetails.policy_id == policy.policy_id).first()
    db.commit()
    return db_policy

def update_customer(db: Session, customer: schemas.CustomerDetails):
    db_customer = db.query(models.CustomerDetails).filter(models.CustomerDetails.customer_id == customer.customer_id).update({models.CustomerDetails.customer_id\
        : customer.customer_id, models.CustomerDetails.customer_gender:customer.customer_gender, models.CustomerDetails.customer_region:customer.customer_region\
            , models.CustomerDetails.customer_income_group:customer.customer_income_group, models.CustomerDetails.customer_marital_status:customer.customer_marital_status},\
                                synchronize_session=False)

    db_customer = db.query(models.CustomerDetails).filter(models.CustomerDetails.customer_id == customer.customer_id).first()
    db.commit()
    return db_customer