import { useLoaderData, useNavigate } from "react-router-dom";

import ProfileCard from "./components/ProfileCard";
import UserApplicationTable from "./components/UserApplicationTable";
import useUserApplications from "./hooks/useUserApplications";

import EmptyStateCard from "@/components/EmptyStateCard";
import { ROUTES } from "@/constants/router";
import { UserApplicationList } from "@/types/application";
import { UserItem } from "@/types/user";

const LIMIT = 5;
const PAGE_LIMIT = 7;

export default function ProfilePage() {
  const { userInfo } = useLoaderData<{
    userInfo: UserItem;
    count: number;
    userApplications: UserApplicationList[];
  }>();
  const navigate = useNavigate();
  const { isLoading, totalCount, userApplications } = useUserApplications();

  return (
    <>
      <section>
        <div className="xl:w-[60.25rem] mx-auto px-6 py-[3.75rem]">
          <div className="flex lg:flex-row flex-col lg:gap-[11.25rem] gap-6 w-full mb-6">
            <h2 className="text-[1.75rem] font-bold">내 프로필</h2>
            {userInfo && (
              <ProfileCard
                {...userInfo}
                className="flex-1"
                onClick={() => navigate(ROUTES.PROFILE.EDIT)}
              />
            )}
          </div>
          {!userInfo && (
            <EmptyStateCard
              description="내 프로필을 등록하고 원하는 가게에 지원해 보세요"
              buttonName="내 프로필 등록하기"
              onClick={() => navigate(ROUTES.PROFILE.REGISTER)}
            />
          )}
        </div>
      </section>

      {userInfo && (
        <section className="flex-1 bg-gray-5">
          <div className="xl:w-[60.25rem] mx-auto px-6 pt-[3.75rem]">
            <h3 className="mb-8 text-[1.75rem] font-bold">신청 내역</h3>

            {isLoading && <div>로딩 중... </div>}

            {!isLoading && userApplications.length === 0 && (
              <EmptyStateCard
                description="아직 신청 내역이 없어요"
                buttonName="공고 보러 가기"
                onClick={() => navigate(ROUTES.NOTICE.ROOT)}
              />
            )}

            {!isLoading && userApplications.length > 0 && (
              <UserApplicationTable
                data={userApplications}
                pageCount={totalCount}
                itemCountPerPage={LIMIT}
                pageLimit={PAGE_LIMIT}
              />
            )}
          </div>
        </section>
      )}
    </>
  );
}
