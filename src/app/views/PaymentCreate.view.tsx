import usePageTitle from "../../core/hooks/usePageTitle";
import PaymentForm from "../features/PaymentForm";

export default function PaymentCreateView() {
  usePageTitle('Cadastro de pagamento')
  return (
    <>
      <PaymentForm/>
    </>
  )
}