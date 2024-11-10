export enum PasswordStrength {
  Weak = 'Weak',
  Medium = 'Medium',
  Strong = 'Strong',
}

const useStrengthDetector = () => {
  return (password: string): PasswordStrength => {
    // checks: [length, one uppercase, one lowercase, one number, one special character]
    let checks = [false, false, false, false, false];

    if (password.length >= 8) {
      checks[0] = true;
    }

    for (let c of password) {
      if (c >= 'A' && c <= 'Z') {
        checks[1] = true;
      }

      if (c >= 'a' && c <= 'z') {
        checks[2] = true;
      }

      if (c >= '0' && c <= '9') {
        checks[3] = true;
      }

      if ('!@#$%^&*()_+'.includes(c)) {
        checks[4] = true;
      }
    }

    let rating = checks.filter(check => check).length;

    if (rating <= 2) {
      return PasswordStrength.Weak;
    } else if (rating <= 3) {
      return PasswordStrength.Medium;
    } else {
      return PasswordStrength.Strong;
    }
  };
};

export default useStrengthDetector;
