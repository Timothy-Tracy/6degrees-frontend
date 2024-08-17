import { Spinner } from "reactstrap";

const LoadingWrapper = ({ isLoading, loadingComponent, children }) => {
    if (isLoading) {
      return loadingComponent || <Spinner />;
    }
    return children;
  };

  export default LoadingWrapper
  