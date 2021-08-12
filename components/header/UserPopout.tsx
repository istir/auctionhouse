import React from "react";
import { Manager, Popper, Reference } from "react-popper";

// interface UserPopoutProps {

// }

// export const UserPopout: React.FC<UserPopoutProps> = ({}) => {
//   const refElement = useRef(null);
//   const popperElement = useRef(null);
//   //   if (refElement) {
//   const { styles, attributes } = usePopper(refElement, popperElement, {
//     // modifiers: [{ name: "arrow", options: { element: arrowElement } }],
//   });
//   return (
//     <div>
//       <input type="button" ref={refElement} value="1"></input>
//       <Popper ref={refElement}>
//         {({ ref, style, placement, arrowProps }) => (
//           <div ref={ref} style={style} data-placement={placement}>
//             Popper element
//             <div ref={arrowProps.ref} style={arrowProps.style} />
//           </div>
//         )}
//       </Popper>
//     </div>
//   );
//   //   } else {
//   //     return <div></div>;
//   //   }
// };
// //   usePopper(openElement, popperElement);

// export default UserPopout;

interface UserPopoutProps {
  username: string | { firstName: string; lastName: string }; //TODO probably need to change object later to a prisma object
  avatar?: string;
  popperInitialElement?;
  initialPoppedState?: "open" | "close";
}
interface UserPopoutState {
  showPoppedElement: boolean;
}

export default class UserPopout extends React.Component<
  UserPopoutProps,
  UserPopoutState
> {
  refElement: any;

  constructor(props: UserPopoutProps) {
    super(props);
    this.state = {
      showPoppedElement: this.props.initialPoppedState === "open",
    };
    this.refElement = React.createRef();
  }

  render() {
    return (
      <div>
        <Manager>
          <Reference>
            {({ ref }) =>
              this.props.popperInitialElement(ref, () => {
                this.setState((prevState) => ({
                  showPoppedElement: !prevState.showPoppedElement,
                }));
              })
            }
          </Reference>
          {this.state.showPoppedElement ? (
            <Popper>
              {({ ref, style, placement, arrowProps }) => (
                <div ref={ref} style={style} data-placement={placement}>
                  Popper element
                  {/* <div ref={arrowProps.ref} style={arrowProps.style} /> */}
                </div>
              )}
            </Popper>
          ) : null}
        </Manager>
      </div>
    );
  }
}
