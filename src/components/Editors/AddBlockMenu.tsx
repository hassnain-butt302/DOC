import { Button, Dropdown } from "antd";
import { PlusOutlined } from "@ant-design/icons";

type AddBlockMenuProps = {
  onSelect: (type: string) => void;
};

const AddBlockMenu = ({ onSelect }: AddBlockMenuProps) => {
  const items = [
    {
      key: "text",
      label: "Text",
    },
    {
  key: "shortText",
  label: "Short Text",
},
{
  key: "dropdown",
  label: "Dropdown",
},
{
  key: "largeText",
  label: "Large Text",
},
   
    {
      key: "radio",
      label: "Radio",
    },
    
    {
      key:"Signature",
      label:"Signature"
    },
  ];

  return (
    <Dropdown
      menu={{
        items,
        onClick: ({ key }) => onSelect(key),
      }}
      styles={{
  root: {
    width: 200,
  },
}}
    >
      <div className="flex w-fit items-center gap-2 " >
        

        <Button type="primary">
          <PlusOutlined />
        </Button>
      </div>
    </Dropdown>
  );
};

export default AddBlockMenu;