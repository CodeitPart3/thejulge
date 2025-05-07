import { useEffect } from "react";

import useBreakpoint from "./useBreakpoint";

import { DeviceType } from "@/utils/device";

interface UseRemoveTopPageScrollParams {
  condition: boolean;
  observeDevices: DeviceType[];
}

function useRemoveTopPageScroll({
  observeDevices,
  condition,
}: UseRemoveTopPageScrollParams) {
  const device = useBreakpoint();

  useEffect(() => {
    const deviceCondition = observeDevices.includes(device);
    if (condition && deviceCondition) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [device, condition, observeDevices]);
}

export default useRemoveTopPageScroll;
