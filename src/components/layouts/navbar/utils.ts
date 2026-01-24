// Sign In button styles
export const getSignInButtonStyles = (isScrolled: boolean): string => {
  return isScrolled
    ? 'text-foreground border-foreground hover:bg-primary hover:text-white hover:border-primary'
    : 'text-white border-white hover:bg-primary hover:text-white hover:border-primary';
};

// Sign Up button styles
export const getSignUpButtonStyles = (isScrolled: boolean): string => {
  return isScrolled
    ? 'bg-black border-foreground text-white hover:bg-primary hover:text-white'
    : 'bg-white border-white text-black hover:bg-primary hover:text-white';
};
