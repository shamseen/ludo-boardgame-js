export function BoardRegion({ region }) {

    // TO DO: if/else home vs path
    return (
        <div className={region.arm}>
            <div className={`home-${region.player}`} id={`${region.player}ln`}>
                <div className="homeLn-container">
                    {/* <HomeLane /> */}
                </div>
            </div>
            {/* <PathSegment segment={region.path} /> */}
            {region.path}
        </div>
    )
}

export function PathSegment({ }) {

    return (
        <div>
            <div></div>
        </div>
    )
}

