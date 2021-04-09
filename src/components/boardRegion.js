export function BoardRegion({ region }) {

    // TO DO: if/else home vs path
    return (
        <div className={region.arm}>
            <HomeLane player={region.player} />
            {/* <PathSegment segment={region.path} /> */}
            {region.path}
        </div>
    )
}

export function HomeLane({ player }) {
    const spaces = Array(4).fill(null);
    return (
        <div className={'home-' + player} id={player + 'ln'}>
            <div className="homeLn-container">
                {spaces.map((sp, i) => {
                    return <div className={`space ${player}Ln`} id={i} key={i}></div>;
                })}
            </div>
        </div>
    )
}

export function PathSegment({ segment }) {
    //
    return (
        <div>
            <div></div>
        </div>
    )
}

