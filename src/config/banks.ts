const banks = {
  hana: {
    id: "0",
    name: "하나",
  },
};

export const bankSelectOptions = [
  { id: "", value: "", label: "-" },
  ...Object.values(banks).map(bank => {
    const { id, name } = bank;

    return {
      id,
      value: id,
      label: name,
    };
  }),
];

export default banks;
