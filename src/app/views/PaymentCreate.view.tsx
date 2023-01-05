import useBreadcrumb from "../../core/hooks/useBreadcrumb";
import usePageTitle from "../../core/hooks/usePageTitle";
import PaymentForm from "../features/PaymentForm";

export default function PaymentCreateView() {
  usePageTitle('Cadastro de pagamento');
  useBreadcrumb('Pagamentos/Cadastro')
  return (
    <>
      <PaymentForm/>
    </>
  )
}