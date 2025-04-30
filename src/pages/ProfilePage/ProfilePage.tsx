import { useEffect, useState } from "react";

import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";

import ProfileCard from "./components/ProfileCard";
import UserApplicationTable from "./components/UserApplicationTable";

import { getUserApplications } from "@/apis/services/applicationService";
import EmptyStateCard from "@/components/EmptyStateCard";
import { ROUTES } from "@/constants/router";
import { UserApplicationList } from "@/types/application";
import { UserItem } from "@/types/user";

const OFFSET = 5;
const LIMIT = 7;

export default function ProfilePage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userInfo = useLoaderData<UserItem>();
  const page = Number(searchParams.get("page")) || 1;
  const [userApplications, setUserApplications] = useState<
    UserApplicationList[]
  >([]);

  const fetchUserApplication = async () => {
    const userApplications = await getUserApplications(
      "42859259-b879-408c-8edd-bbaa3a79c674",
      (page - 1) * OFFSET,
      LIMIT,
    );
    const nextUserApplications = userApplications.data.items.map(
      ({ item }) => item,
    );
    setUserApplications(nextUserApplications);
  };

  useEffect(() => {
    fetchUserApplication();
  }, [page]);

  return (
    <div className="w-full">
      <section className="py-[3.75rem]">
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
      </section>

      {userInfo && (
        <section className="pt-[3.75rem] pb-[7.5rem] bg-gray-5">
          <h3 className="mb-8 text-[1.75rem] font-bold">신청 내역</h3>
          {userApplications.length === 0 ? (
            <EmptyStateCard
              description="아직 신청 내역이 없어요"
              buttonName="공고 보러 가기"
              onClick={() => navigate(ROUTES.NOTICE.ROOT)}
            />
          ) : (
            <UserApplicationTable
              data={userApplications}
              pageCount={OFFSET}
              pageLimit={LIMIT}
            />
          )}
        </section>
      )}
    </div>
  );
}
