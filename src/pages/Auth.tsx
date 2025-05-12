import { Button, Card, Form, Input } from "antd";
import { useEffect, useState } from "react";
import FormItem from "antd/lib/form/FormItem";
import { AuthFieldTypes } from "../utils/types";
import { Link, useLocation } from "react-router";
import { authRoutes } from "../router/routes/authRoutes";
import {
    doCreateUserWithEmailAndPassword,
    doSignInWithEmailAndPassword,
} from "../firebase/auth";

export const Auth: React.FC = () => {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [form] = Form.useForm();

    useEffect(() => {
        if (location.pathname.includes("login")) {
            setIsLogin(true);
        } else if (location.pathname.includes("register")) {
            setIsLogin(false);
        }
    }, [location.pathname]);

    const onFinish = () => {
        try {
            isLogin
                ? doSignInWithEmailAndPassword(
                      form.getFieldValue("email"),
                      form.getFieldValue("password"),
                  )
                : doCreateUserWithEmailAndPassword(
                      form.getFieldValue("email"),
                      form.getFieldValue("password"),
                  );
        } catch (error) {
            console.error(error);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const onFinishFailed = () => {
        console.log(2);
    };
    return (
        <Card style={{ width: 500, margin: "auto", marginTop: 100 }}>
            <h1>{isLogin ? "Авторизация" : "Регистрация"}</h1>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <FormItem<AuthFieldTypes>
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите email!",
                        },
                        {
                            type: "email",
                            message: "Невалидный email!",
                        },
                    ]}
                >
                    <Input type={"email"} placeholder={"Введите почту"} />
                </FormItem>
                <FormItem<AuthFieldTypes>
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Пожалуйста, введите пароль!",
                        },
                        {
                            type: "string",
                            max: 30,
                            min: 6,
                            message: "Пароль от 6 до 30 символов!",
                        },
                    ]}
                >
                    <Input type={"password"} placeholder={"Введите пароль"} />
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" style={{ width: "100%" }}>
                        {isLogin ? "Войти" : "Зареристрироваться"}
                    </Button>
                </FormItem>
            </Form>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link
                    to={`/${isLogin ? authRoutes.REGISTER_ROUTE : authRoutes.LOGIN_ROUTE}`}
                >
                    {isLogin
                        ? "Нет аккаунта? Зарегистрироваться."
                        : "Уже есть аккаунт? Войти."}
                </Link>
            </div>
        </Card>
    );
};
