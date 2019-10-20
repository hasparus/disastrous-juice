type Merge<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] } & B;
type OverwriteKeys<A, B> = { [K in keyof A]: K extends keyof B ? B[K] : A[K] };

declare module "react-spring/three" {
  export { animated } from "react-spring";

  import {
    AnimatedValue,
    ForwardedProps,
    SetUpdateFn,
    UseSpringProps,
    SetUpdateCallbackFn,
  } from "react-spring";

  // This isn't exactly correct
  export type AnimatedProps = Partial<
    import("react-three-fiber").ReactThreeFiber.Object3DNode<any, any>
  >;

  export function useSpring<DS extends object>(
    values: UseSpringProps<Merge<DS, AnimatedProps>>
  ): AnimatedValue<ForwardedProps<OverwriteKeys<DS, AnimatedProps>>>;
  export function useSpring<DS extends object>(
    getProps: () => UseSpringProps<Merge<DS, AnimatedProps>>
  ): [
    AnimatedValue<ForwardedProps<OverwriteKeys<DS, AnimatedProps>>>,
    SetUpdateFn<OverwriteKeys<DS, AnimatedProps>>
  ];

  // there's a third value in the tuple but it's not public API (?)
  export function useSprings<TItem, DS extends AnimatedProps>(
    count: number,
    items: ReadonlyArray<TItem>
  ): ForwardedProps<DS>[]; // safe to modify (result of .map)
  export function useSprings<DS extends object>(
    count: number,
    getProps: (i: number) => UseSpringProps<DS>
  ): [AnimatedValue<ForwardedProps<DS>>[], SetUpdateCallbackFn<DS>];
}
