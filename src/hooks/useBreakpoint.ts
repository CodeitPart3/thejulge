import { useEffect, useState } from "react";

import { debounce } from "@/utils/debounce";
import { DeviceType, getDeviceType } from "@/utils/device";

function useBreakpoint(): DeviceType {
  const [device, setDevice] = useState<DeviceType>(() =>
    getDeviceType(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = debounce(() => {
      setDevice(getDeviceType(window.innerWidth));
    }, 200);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}

export default useBreakpoint;
