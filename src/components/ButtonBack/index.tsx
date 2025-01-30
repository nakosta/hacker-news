import { JSX } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

const ButtonBack = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <Button type="primary" danger onClick={() => navigate("/")}>
      ← Назад
    </Button>
  );
};

export default ButtonBack;
