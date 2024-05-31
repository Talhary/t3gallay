import { initialStateProps } from "types/uploadPageProps"

export const ItemCard= (props : initialStateProps) => {

  return (
    <div>
         <div className="card w-[250px] bg-base-100 shadow-xl">
  <figure><img src={props.imgUrl} alt="Shoes" /></figure>
  <div className="card-body">
    <h2 className="card-title">{props["image-name"]}</h2>
    <p>{props.paragraph}</p>
 
  </div>
</div>
      
    </div>
  )
}
