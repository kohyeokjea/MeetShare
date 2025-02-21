import React, { useEffect, useState } from "react";
import { format } from "date-fns";
// 모달 Component
import MyPageModal from "../components/MyPageModal";
// api import
import { fetchProfile } from "../services/calApi";
import { withdraw } from "../services/userApi";

function MyPage() {
  // 모달 설정
  const [openModal, setOpenModal] = useState(false);
  const [data, setData] = useState(""); // for 수정 -> 데이터 전달

  const handleModal = (data) => {
    setData(data);
    setOpenModal(true);
  };

  // 탭 설정
  const [selectedTab, setSelectedTab] = useState(0); // 0 -> '프로필 편집' /  1 -> '회원 탈퇴'

  // ---------- 프로필 설정 ----------
  const [profiles, setProfiles] = useState([]);
  console.log(profiles);

  // 프로필 목록 불러오기
  const loadProfiles = async () => {
    try {
      const data = await fetchProfile();
      const fmtData = data.map((profile) => ({
        ...profile,
        regidate: format(new Date(profile.regidate), "yyyy-MM-dd"),
      }));
      setProfiles(fmtData);
    } catch (error) {
      console.error("프로필 목록 로드 실패:", error);
    }
  };

  useEffect(() => {
    loadProfiles();
  }, []);

  // ---------- 회원 탈퇴 설정 ----------
  const handleWithdraw = async () => {
    if (
      window.confirm("탈퇴하시면 복구할 수 없습니다. 정말 탈퇴하시겠습니까?")
    ) {
      try {
        const data = await withdraw();
        alert(data.msg);
        // window.location.href = "/";
      } catch (error) {
        console.error("회원 탈퇴 프로세스 실패:", error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="w-[1400px] min-h-[800px]">
          {/* 공지 div */}
          <div className="p-5 border-[2px] border-[#475cf8] rounded-[15px] mt-10">
            <ul>
              <li className="text-[18px] relative pl-[15px] custom-icon1">
                공지1가 들어갈 곳입니다.
              </li>
              <li className="text-[18px] relative pl-[15px] custom-icon1 mt-1">
                공지2가 들어갈 곳입니다.
              </li>
            </ul>
          </div>
          {/* 공지 div 끝 */}

          {/* 탭 부분 */}
          <div className="mt-10 flex flex-col">
            <div className="w-full flex justify-center space-x-5">
              <div
                className={`w-[50%] px-[23px] py-[25px] rounded-[100px] bg-[#dfe6f1] cursor-pointer flex justify-center items-center ${
                  selectedTab === 0
                    ? "bg-white border-[3px] border-[#6730dc]"
                    : ""
                }`}
                onClick={() => setSelectedTab(0)}
              >
                <span
                  className={`text-[18px] font-medium ${
                    selectedTab === 0 ? "text-[#6730dc] !font-bold" : ""
                  }`}
                >
                  프로필 편집
                </span>
              </div>

              <div
                className={`w-[50%] px-[23px] py-[25px] rounded-[100px] bg-[#dfe6f1] cursor-pointer flex justify-center items-center ${
                  selectedTab === 1
                    ? "bg-white border-[3px] border-[#6730dc]"
                    : ""
                }`}
                onClick={() => setSelectedTab(1)}
              >
                <span
                  className={`text-[18px] font-medium ${
                    selectedTab === 1 ? "text-[#6730dc] !font-bold" : ""
                  }`}
                >
                  회원 탈퇴
                </span>
              </div>
            </div>
            {/* 탭 부분 끝 */}

            {/* 프로필 편집 */}
            {selectedTab === 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                {profiles.length > 0 ? (
                  profiles.map((profile) => (
                    <div className="bg-white border-[1px] border-[#6730dc]">
                      <div className="p-4">
                        <h2 className="text-[18px] font-semibold text-[#000]">
                          {profile.title}
                        </h2>
                        <span className="text-gray-600">
                          가입일자 : {profile.regidate}
                        </span>
                        <button
                          onClick={() => handleModal(profile)}
                          className="mt-4 bg-gradient-to-r from-[#9d2db1] to-[#2970d8] text-white font-medium py-2 px-4 w-full"
                        >
                          프로필 편집
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-[18px] text-[#000] text-center w-full">
                    가입된 캘린더가 없습니다.
                  </p>
                )}
                {/* 모달 컴포넌트 */}
                <MyPageModal
                  data={data}
                  openModal={openModal}
                  onClose={() => setOpenModal(false)}
                />
              </div>
            )}

            {/* 회원탈퇴 */}
            {selectedTab === 1 && (
              <div className="flex flex-col items-center justify-center p-20">
                <div className="bg-[#f8f8f8] border-b-[1px] border-b-[#6730dc] p-8 w-full max-w-[450px] h-[300px] flex flex-col justify-center items-center relative">
                  {/* <img src="" alt="회원탈퇴" className="w-[60px]" /> */}
                  <div className="flex flex-col items-center">
                    <h2 className="text-[25px] text-[#ce2b67] font-bold">
                      회원 탈퇴
                    </h2>
                    <p className="text-gray-700 mt-1">
                      *탈퇴 버튼 선택 시, 계정은 삭제되며 복구되지 않습니다.
                    </p>
                  </div>
                  <div className="text-[18px] font-semibold mt-7">
                    <button
                      onClick={handleWithdraw}
                      className="w-[120px] h-[50px] bg-[#ce2b67] text-[16px] font-medium"
                    >
                      <span className="text-white">탈퇴하기</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
