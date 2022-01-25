import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { isNil } from "lodash";

import RadioTabs from "src/components/MUI/customs/radioTabs";

function Policy() {
  const navigate = useNavigate();
  const routeParams = useParams();

  const [tabIndex, setTabIndex] = useState<number | null>(null);

  const tabs = useMemo(() => {
    return [
      { label: "이용약관", path: "/policy/contract" },
      { label: "개인정보 처리방침", path: "/policy/privacy" },
      { label: "취소 및 환불 정책", path: "/policy/cancellation" },
    ];
  }, []);

  useEffect(() => {
    const tabIndex = tabs.findIndex(tab => tab.path.split("/policy/")[1] === routeParams.tab);
    const existTabIndex = tabIndex > -1;

    if (existTabIndex) {
      setTabIndex(tabIndex);
    }

    if (!existTabIndex) {
      navigate("/not-found");
    }
  }, [routeParams, tabs, navigate]);

  const handleTabChange = (newIndex: number) => {
    navigate(tabs[newIndex].path);
  };

  return (
    <div>
      <nav id="policy-nav">
        {!isNil(tabIndex) && <RadioTabs tabIndex={tabIndex} tabsProps={tabs} onChange={handleTabChange} />}
      </nav>
    </div>
  );
}

export default Policy;
