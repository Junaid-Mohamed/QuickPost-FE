
const FollowerSuggestionCard : React.FC = () => {
    return(
        <div className="p-4 flex justify-between mb-2" >
            <div>
                <img src="https://avatars.githubusercontent.com/u/64761352?v=4" height={50} width={50} className="rounded-full" alt="user" />
            </div>
            <div>
                <h5 className="my-0" >Mohammed Junaid</h5>
                <h5 className="text-slate-400" >@mohammedjunaid</h5>
            </div>
            <div>
                <button className="text-red-300" >Follow +</button>
            </div>
        </div>
    )
}

export default FollowerSuggestionCard;