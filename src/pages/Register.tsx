import { Button, Card, Form, Input } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { AuthFieldTypes } from "../utils/types";
import { Link } from "react-router";
import { authRoutes } from "../router/routes/authRoutes";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";

export const Register: React.FC = () => {
    const [form] = Form.useForm();

    const onFinish = async () => {
        try {
            await doCreateUserWithEmailAndPassword(
                form.getFieldValue("email"),
                form.getFieldValue("password"),
            );
        } catch (error) {
            console.error(error);
        }
    };

    const onFinishFailed = () => {
        console.error("Form validation failed");
    };

    return (
        <Card style={{ width: 500, margin: "auto", marginTop: 100 }}>
            <h1>Регистрация</h1>
            <Form
                name="register"
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
                    <Input type="email" placeholder="Введите почту" />
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
                    <Input type="password" placeholder="Введите пароль" />
                </FormItem>
                <FormItem>
                    <Button htmlType="submit" style={{ width: "100%" }}>
                        Зарегистрироваться
                    </Button>
                </FormItem>
            </Form>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Link to={`/${authRoutes.LOGIN_ROUTE}`}>
                    Уже есть аккаунт? Войти.
                </Link>
            </div>
        </Card>
    );
}; 