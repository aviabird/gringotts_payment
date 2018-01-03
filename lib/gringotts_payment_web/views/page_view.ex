defmodule GringottsPaymentWeb.PageView do
  use GringottsPaymentWeb, :view

  def render("purchase.json", %{success: data}) do
    %{
      success: true,
      data: data
    }
  end

  def render("purchase.josn", %{error: data}) do
    %{
      success: false,
      data: data
    }
  end
end
