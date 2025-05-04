import { Location, Time } from "@/assets/icon";

function NoticeDetailSkeleton() {
  return (
    <section>
      <div className="flex flex-col gap-3 md:gap-6 xl:w-[60.25rem] mx-auto px-3 md:px-8 py-10 md:py-[3.75rem]">
        <div className="flex flex-col gap-2 mb-1 md:mb-2">
          <span className="inline-block text-sm md:text-base text-primary font-bold leading-5">
            식당
          </span>
          <h2 className="h-5 md:h-[1.75rem] animate-skeleton rounded-md" />
        </div>
        <article
          className={
            "flex flex-col lg:flex-row gap-4 lg:gap-[1.875rem] w-full h-[30.25rem] md:h-[44.875rem] lg:h-[22.25rem] rounded-xl border border-gray-20 bg-white p-5 md:p-6 shadow-sm"
          }
        >
          <div className="flex-1 h-full lg:h-[19.25rem]">
            <div className="w-full h-full animate-skeleton rounded-xl" />
          </div>

          <div className="flex flex-col justify-between w-full lg:w-[21.625rem] h-[15.75rem] lg:h-full">
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex flex-col justify-center">
                <span className="inline-block w-[1.875rem] h-4 animate-skeleton rounded-sm lg:mt-4 mb-2" />
                <span className="inline-block w-[10rem] h-[1.375rem] md:h-7 animate-skeleton rounded-sm" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-1.5">
                  <Time className="h-4 w-4 md:h-5 md:w-5" />
                  <div className="w-full h-4 animate-skeleton rounded-sm" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Location className="h-4 w-4 md:h-5 md:w-5" />
                  <div className="w-full h-4 animate-skeleton rounded-sm" />
                </div>
              </div>
            </div>
            <div className="w-full h-[2.625rem] animate-skeleton rounded-md" />
          </div>
        </article>

        <div className="flex flex-col gap-3 p-8 bg-gray-10 rounded-xl">
          <span className="font-bold leading-5">공고 설명</span>
          <p className="w-full h-[3.25rem] animate-skeleton rounded-md" />
        </div>
      </div>
    </section>
  );
}

export default NoticeDetailSkeleton;
