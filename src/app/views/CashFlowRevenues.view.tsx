import useBreadcrumb from "../../core/hooks/useBreadcrumb";
import usePageTitle from "../../core/hooks/usePageTitle";
import EntryCRUD from "../features/EntryCRUD";

export default function CashFlowRevenuesView() {
  usePageTitle('Despesa');
  useBreadcrumb('Fluxo de caixa/Receita');
  return <EntryCRUD type={'REVENUE'} />
}