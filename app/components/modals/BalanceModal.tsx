'use client'
import useBalanceModal from "@/app/hooks/useBalanceModal";
import Modal from "./Modal";

const BalanceModal = () => {
  const balanceModalHook = useBalanceModal()

  return (
    <Modal
      title="Top Up Balance"
      isOpen={balanceModalHook.isOpen}
      onClose={balanceModalHook.onClose}
      onSubmit={() => {}}
      actionLabel="Top Up"
    />
  );
}
 
export default BalanceModal;