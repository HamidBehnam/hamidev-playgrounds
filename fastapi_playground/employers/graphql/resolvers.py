from strawberry import Info
from typing import List, TYPE_CHECKING, Optional
from sqlmodel import select
from fastapi_playground.core.db import get_session
from fastapi_playground.employers.models import Employer

if TYPE_CHECKING:
    from fastapi_playground.employers.graphql.types import Employer as EmployerType



def get_employers(info: Info) -> List["EmployerType"]:
    session = next(get_session())
    return session.exec(select(Employer)).all()

def get_employer(info: Info, id: str) -> "EmployerType":
    session = next(get_session())
    return session.get(Employer, id)

def create_employer(info: Info, name: str, email: str, industry: str) -> "EmployerType":
    session = next(get_session())
    employer = Employer(name=name, email=email, industry=industry)
    session.add(employer)
    session.commit()
    session.refresh(employer)
    return employer

def update_employer(info: Info, id: str, name: Optional[str] = None, email: Optional[str] = None, industry: Optional[str] = None) -> "EmployerType":
    session = next(get_session())
    employer = session.get(Employer, id)
    if employer is None:
        raise Exception("Employer not found")
    if name:
        employer.name = name
    if email:
        employer.email = email
    if industry:
        employer.industry = industry
    session.commit()
    session.refresh(employer)
    return employer

def delete_employer(info: Info, id: str) -> bool:
    session = next(get_session())
    employer = session.get(Employer, id)
    if employer is None:
        raise Exception("Employer not found")
    session.delete(employer)
    session.commit()
    return True
