import strawberry
from typing import Annotated, TYPE_CHECKING, List
from fastapi_playground.jobs.graphql.resolvers import get_jobs, get_job, create_job, \
    update_job, delete_job

# the following is causing circular import
# from fastapi_playground.employers.graphql.types import Employer

if TYPE_CHECKING:
    from fastapi_playground.employers.graphql.types import Employer



@strawberry.type
class Job:
    id: int
    title: str
    description: str
    employer_id: int
    employer: Annotated[
        "Employer", strawberry.lazy("fastapi_playground.employers.graphql.types")
    ]


@strawberry.type
class JobQuery:
    jobs: List[Job] = strawberry.field(resolver=get_jobs)
    job: Job = strawberry.field(resolver=get_job)


@strawberry.type
class JobMutation:
    create_job: Job = strawberry.mutation(resolver=create_job)
    update_job: Job = strawberry.mutation(resolver=update_job)
    delete_job: bool = strawberry.mutation(resolver=delete_job)
