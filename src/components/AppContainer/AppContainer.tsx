import { FC, ReactNode } from "react";
import "./AppContainer.css";

export interface AppContainerProps {
  children?: ReactNode;
}

const AppContainer: FC<AppContainerProps> = ({
  children,
}: AppContainerProps) => <>{children}</>;

AppContainer.displayName = "AppContainer";
AppContainer.defaultProps = {
  children: undefined,
};

export default AppContainer;
