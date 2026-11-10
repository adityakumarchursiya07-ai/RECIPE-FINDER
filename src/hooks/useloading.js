import { useState } from "react";

function useloading() {
  const [loading, setLoading] = useState(true);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  return {
    loading,
    startLoading,
    stopLoading,
  };
}

export default useloading;