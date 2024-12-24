import strawberry
from fastapi_playground.employers.graphql.types import EmployerQuery, EmployerMutation
from fastapi_playground.jobs.graphql.types import JobQuery, JobMutation


@strawberry.type
class Query(
    EmployerQuery,
    JobQuery
):
    pass


@strawberry.type
class Mutation(
    EmployerMutation,
    JobMutation
):
    pass
