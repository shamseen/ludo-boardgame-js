export default function PathSegment({ seg }) {

    // TO DO: if/else home vs path
    return (
        <div className={seg.arm}>
            <div className="homeLn-container"></div>
            {seg.spaces}
        </div>
    )
}