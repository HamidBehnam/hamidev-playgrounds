import subprocess
import shutil
from pathlib import Path
from simple_term_menu import TerminalMenu

def list_branches(repo_url):
    """Retrieve available branches from the remote repository."""
    try:
        result = subprocess.run(
            ["git", "ls-remote", "--heads", repo_url],
            capture_output=True,
            text=True,
            check=True
        )
        branches = [
            line.split("refs/heads/")[-1].strip() for line in result.stdout.splitlines()
        ]
        return branches
    except subprocess.CalledProcessError as e:
        print(f"Error fetching branches: {e}")
        return []

def list_directories():
    """List the current directory and its first-level subdirectories."""
    current_dir = Path.cwd()
    directories = [str(current_dir)]
    directories.extend([str(p) for p in current_dir.iterdir() if p.is_dir()])
    return directories

def env_loader():
    try:
        # Step 1: Define default repositories
        default_repos = [
            "https://github.com/HamidBehnam/hamidev-secrets.git",
            "Other"
        ]

        # Step 2: Prompt user to select a repository
        print("Select the Git repository to clone:")
        repo_menu = TerminalMenu(default_repos)
        selected_repo_index = repo_menu.show()

        if selected_repo_index is None:
            print("No repository selected. Exiting.")
            return

        selected_repo = default_repos[selected_repo_index]

        if selected_repo == "Other":
            selected_repo = input("Enter the Git repository URL: ").strip()

        # Step 3: Retrieve and list branches from the selected repository
        print(f"Fetching branches for repository: {selected_repo}...")
        branches = list_branches(selected_repo)

        if not branches:
            print("No branches found or unable to fetch branches. Exiting.")
            return

        print("Select the branch:")
        branch_menu = TerminalMenu(branches)
        selected_branch_index = branch_menu.show()

        if selected_branch_index is None:
            print("No branch selected. Exiting.")
            return

        selected_branch = branches[selected_branch_index]

        if selected_branch == "Other":
            selected_branch = input("Enter the branch: ").strip()

        # Step 4: Set the destination to the directory of this script
        current_directory = Path(__file__).parent.resolve()
        dest_env_path = current_directory / ".env"

        # Step 5: Clone the repository
        secrets_dir = ".secrets_temp"
        try:
            print(f"\nCloning repository '{selected_repo}' (branch: {selected_branch})...")
            subprocess.run(
                ["git", "clone", "--branch", selected_branch, "--single-branch", selected_repo,
                 secrets_dir],
                check=True
            )

            # Step 6: Copy the .env file
            env_file_path = Path(secrets_dir) / ".env"
            if not env_file_path.exists():
                raise FileNotFoundError(
                    "The .env file was not found in the cloned repository.")

            shutil.copy(env_file_path, dest_env_path)
            print(f".env file copied to {dest_env_path}")

        except subprocess.CalledProcessError as e:
            print(f"Error cloning the repository: {e}")
        except FileNotFoundError as e:
            print(f"Error: {e}")
        finally:
            # Cleanup temporary directory
            if Path(secrets_dir).exists():
                shutil.rmtree(secrets_dir)

    except KeyboardInterrupt:
        print("\nProcess interrupted by user. Exiting gracefully.")
        return

if __name__ == "__main__":
    env_loader()
