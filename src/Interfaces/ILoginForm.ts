type IForm = string;
type ITest = boolean;


export default interface ILoginForm
{
    username: IForm,
    password: IForm,
    submit: IForm
    testInjection: ITest;
};