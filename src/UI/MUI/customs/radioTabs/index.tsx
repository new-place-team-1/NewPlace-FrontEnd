import { Tab, Tabs } from "src/UI/MUI";

type TabProps = {
  label: string;
  [prop: string]: any;
};

interface IProps {
  tabIndex: number;
  tabsProps: Array<TabProps>;
  onChange: (newIndex: number) => void;
}

function RadioTabs({ tabIndex, tabsProps, onChange }: IProps) {
  const handleChange = (event: React.SyntheticEvent, newIndex: number) => {
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
