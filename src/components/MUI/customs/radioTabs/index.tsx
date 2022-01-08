import { useState } from "react";

import { Tab, Tabs } from "src/components/MUI";

type TabProps = {
  label: string;
  [prop: string]: any;
};

interface IProps {
  tabsProps: Array<TabProps>;
  onChange: (tabIndex: number) => void;
}

function RadioTabs({ tabsProps, onChange }: IProps) {
  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    onChange(newIndex);
  };

  return (
    <Tabs value={tabIndex} className="radio-tabs" onChange={handleChange}>
      {tabsProps.map(tabProps => (
        <Tab key={tabProps.label} {...tabProps} />
      ))}
    </Tabs>
  );
}

export default RadioTabs;
