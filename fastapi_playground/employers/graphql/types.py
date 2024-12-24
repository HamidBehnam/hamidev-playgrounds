import strawberry
from typing import List
from fastapi_playground.employers.graphql.resolvers import get_employers, get_employer, \
    create_employer, update_employer, delete_employer
from fastapi_playground.jobs.graphql.types import Job


@strawberry.type
class Employer:
    id: int
    name: str
    email: str
    industry: str
    jobs: list[Job]


@strawberry.type
class EmployerQuery:
    employers: List[Employer] = strawberry.field(resolver=get_employers)
    employer: Employer = strawberry.field(resolver=get_employer)


@strawberry.type
class EmployerMutation:
    create_employer: Employer = strawberry.mutation(resolver=create_employer)
    update_employer: Employer = strawberry.mutation(resolver=update_employer)
    delete_employer: bool = strawberry.mutation(resolver=delete_employer)
