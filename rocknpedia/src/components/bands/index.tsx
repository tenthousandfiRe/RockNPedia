import React from 'react';
import { connect } from "react-redux";
import { myFetch } from "../../utils";
import { IAccount } from '../../interfaces/IAccount'
import { SetBandsAction } from '../../redux/actions'
import { IBand } from '../../interfaces/IBand'
import { IStore } from '../../interfaces/IStore'


interface IGlobalStateProps {
    band: IBand
    bands: IBand[];
    setBands(bands: IBand[]): void,
}

interface IGlobalActionProps { }

type TProps = IGlobalStateProps & IGlobalActionProps;

class Bands extends React.PureComponent<TProps> {
    constructor(props: TProps) {
        super(props)

    }

    getBands() {
        myFetch({ path: "/bands/" }).then(json => {
            this.props.setBands(json)
        })


    }

    componentWillMount() {
        this.getBands()
    }

    render() {
        const { band } = this.props
        const { name, foundation_year, band_image } = band
        return (
            <div className="card" style={{width: 500}}>
                <img src="http://www.publicidadeuskadi.com/img/2013/03/rollingstonestonguelogo.jpg" className="card-img-top" alt="..."></img>
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div>


        )
    }
}

const mapStateToProps = ({ bands }: IStore) => ({ bands });

const mapDispatchToProps = {
    setBands: SetBandsAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Bands);