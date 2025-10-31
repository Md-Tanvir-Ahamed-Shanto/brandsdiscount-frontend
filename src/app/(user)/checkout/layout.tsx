import CheckoutErrorBoundary from './components/CheckoutErrorBoundary';

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CheckoutErrorBoundary>
      {children}
    </CheckoutErrorBoundary>
  );
}