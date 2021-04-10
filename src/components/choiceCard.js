import "../styles/choiceCard.scss";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';


export default function ChoiceCard({ G, pieces, clicked }) {

    // elevated effect on header
    const cardHeaderShadowStyles = useFadedShadowStyles();

    return (
        <Card>
            {/* src: https://mui-treasury.com/styles/card-header/ */}
            <CardHeader
                className={`${cardHeaderShadowStyles.root} ${G.currentPlayer.color}`}
                title={`Which piece should move ${G.roll.sum} spaces?`}
            >
            </CardHeader>
            <CardActions>
                {pieces.map(p => {
                    return <Button variant="outlined" key={p}
                        onClick={(e) => { clicked(e, p) }}
                        className={G.currentPlayer.color}>
                        Space {G.currentPlayer.pieces[p] + 1}
                    </Button>
                })}
            </CardActions>
        </Card >
    )

}