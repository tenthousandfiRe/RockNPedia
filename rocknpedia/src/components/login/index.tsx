import React from 'react'


interface IProps {}

interface IGlobalActionProps {
}

interface IState {
  username: string;
  password: string;
  confirmation: string;
}

type TProps = IProps & IGlobalActionProps;

class Login extends React.PureComponent<TProps, IState> {
    constructor(props: TProps){
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmation: ""
        }
    }
}