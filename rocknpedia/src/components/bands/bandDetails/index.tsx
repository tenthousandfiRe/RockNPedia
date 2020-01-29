import React from 'react';
import { connect } from 'react-redux';
import { myFetch } from '../../../utils'; 


interface IProps {}

interface IGlobalActionProps {}

interface IState {}

type TProps = IProps & IGlobalActionProps;

class BandDetails extends React.PureComponent<TProps, IState> {
    constructor(props: TProps) {
        super(props)
    }
}