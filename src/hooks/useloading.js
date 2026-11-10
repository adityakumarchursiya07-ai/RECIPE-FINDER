import { useState } from "react";



function UseLoading() {
  const [loading, setLoading] = useState(true);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  return {
    loading,
    startLoading,
    stopLoading,
  };
}

export default UseLoading;