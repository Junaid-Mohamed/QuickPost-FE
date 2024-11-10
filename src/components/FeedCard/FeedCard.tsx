import { CiBookmark, CiHeart, CiShare2 } from "react-icons/ci";
import { GoComment } from "react-icons/go";

const FeedCard: React.FC = () => {
    return(
        <div>
            <div className="grid grid-cols-12 my-4 border gap-2 border-white bg-white cursor-pointer p-5">
                <div className="col-span-1">
                    <img src="https://avatars.githubusercontent.com/u/64761352?v=4" alt="user-image" className="rounded-full" width={50} height={50}/>
                </div>
                <div className="col-span-11">
                    <h5>Mohammed Junaid</h5>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut, adipisci cumque similique, voluptas vero ab iure enim quasi eos accusamus ipsa in recusandae dolorem perspiciatis delectus, natus quisquam obcaecati? Alias.</p>
                    <div className="flex justify-between text-xl mt-5">
                        <div>
                        <CiHeart />
                        </div>
                        <div>
                        <GoComment />
                        </div>
                        <div>
                        <CiShare2 />
                        </div>
                        <div>
                        <CiBookmark />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedCard;