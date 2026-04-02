"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, Trash2, CreditCard, Wallet, Smartphone, CheckCircle2, Plus, Check, ChevronsUpDown } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";
import { districts } from "@/lib/data/districts";
import { thanasByDistrict } from "@/lib/data/thanas";
import { cn } from "@/lib/utils";

// Shadcn UI Imports
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function CheckoutPage() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "online" | "bkash">("cod");
  const [showBilling, setShowBilling] = useState(false);

  // District state
  const [shippingDistrict, setShippingDistrict] = useState("");
  const [shippingDistrictOpen, setShippingDistrictOpen] = useState(false);
  const [shippingThana, setShippingThana] = useState("");
  const [shippingThanaOpen, setShippingThanaOpen] = useState(false);
  const [billingDistrict, setBillingDistrict] = useState("");
  const [billingDistrictOpen, setBillingDistrictOpen] = useState(false);
  const [billingThana, setBillingThana] = useState("");
  const [billingThanaOpen, setBillingThanaOpen] = useState(false);

  // Dynamic thana list based on district
  const getThanasForDistrict = (district: string) => {
    return thanasByDistrict[district] || [];
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  const subTotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCost = 0; // Mock delivery cost
  const total = subTotal + deliveryCost;

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-20">
      {/* ── Page Header & Breadcrumbs ─────────────────────────── */}
      <div className="w-full bg-white border-b py-8 text-center">
        <h1 className="text-[28px] font-bold text-[#2D333A] mb-2 uppercase tracking-tight">Checkout</h1>
        <nav className="flex items-center justify-center gap-2 text-[13px] text-gray-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} className="text-gray-400" />
          <span className="text-primary font-medium">Checkout</span>
        </nav>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 mt-8">
        {/* ── Login/Register Banner ────────────────────────────── */}
        <div className="bg-white border border-gray-100 rounded-lg p-3.5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <p className="text-[14px] text-gray-700">
            Have any account? <span className="hover:text-primary cursor-pointer transition-colors font-medium">please login or register</span>
          </p>
          <div className="flex gap-3">
            <Button variant="outline" className="px-6 h-10 text-[13px] font-bold uppercase tracking-wider border-gray-100 hover:border-primary hover:bg-transparent">
              Login
            </Button>
            <Button className="px-6 h-10 text-[13px] font-bold uppercase tracking-wider shadow-sm">
              Register
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.8fr_1fr] gap-8">

          {/* ── LEFT COLUMN ───────────────────────────────────── */}
          <div className="space-y-8">

            {/* Order Review Section */}
            <section className="bg-white rounded-[10px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2.5">
                <div className="w-[3px] h-4 bg-primary rounded-full" />
                <h2 className="text-[15px] font-bold text-[#2D333A] uppercase tracking-wide">Order review</h2>
              </div>
              <div className="p-6 space-y-5">
                {items.length > 0 ? (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center gap-5 pb-5 border-b border-gray-50 last:border-0 last:pb-0 group">
                      <div className="w-16 h-16 bg-[#FAFAFA] border border-gray-100 rounded-md overflow-hidden flex items-center justify-center p-2 shrink-0">
                        {item.image.includes('http') ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-3xl">{item.image}</span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-bold text-[#3b4148] leading-snug line-clamp-1 mb-1.5">{item.name}</h3>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-1.5 text-[13px] text-gray-500 font-medium">
                            Qty:
                            <div className="flex items-center border border-gray-200 rounded-md bg-[#FAFAFA] ml-1 overflow-hidden">
                              <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-[26px] h-[26px] flex items-center justify-center hover:text-primary hover:bg-gray-100 transition-colors">-</button>
                              <span className="w-6 text-center text-[12px] font-bold text-gray-800">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-[26px] h-[26px] flex items-center justify-center hover:text-primary hover:bg-gray-100 transition-colors">+</button>
                            </div>
                          </div>
                          <span className="text-[14px] font-bold text-[#3b4148]">৳{(item.price * item.quantity).toLocaleString()}.00</span>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50 text-red-800 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-800 hover:text-white">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center py-4 text-gray-500 italic">No items in cart</p>
                )}
              </div>
            </section>

            {/* Shipping Address Section */}
            <section className="bg-white rounded-[10px] border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-2.5">
                <div className="w-[3px] h-4 bg-primary rounded-full" />
                <h2 className="text-[15px] font-bold text-[#2D333A] uppercase tracking-wide">Shipping Address</h2>
              </div>
              <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input id="shipping-name" placeholder="Your Full Name *" className="h-[46px] border-[#E5E7EB] rounded-[10px] focus-visible:ring-primary/20 focus-visible:border-primary shadow-none" />
                  <div className="flex h-[46px] items-center border border-[#E5E7EB] rounded-[10px] overflow-hidden bg-white focus-within:ring-3 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                    <div className="px-3 h-full flex items-center bg-[#F8F9FA] border-r border-[#E5E7EB] text-gray-500 text-[13px] font-medium shrink-0">88</div>
                    <input id="shipping-phone" type="text" placeholder="017********" className="w-full h-full px-4 text-sm focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Popover open={shippingDistrictOpen} onOpenChange={setShippingDistrictOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={shippingDistrictOpen}
                        className="w-full h-[46px] justify-between font-normal border-[#E5E7EB] rounded-[10px] hover:bg-transparent focus:ring-primary/20 focus:border-primary px-4 bg-white text-gray-500"
                      >
                        {shippingDistrict
                          ? districts.find((d) => d === shippingDistrict)
                          : "Select District *"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 shadow-lg rounded-lg overflow-hidden border-gray-100" align="start">
                      <Command className="w-full border-none">
                        <CommandInput placeholder="Search district..." className="h-10 border-none focus:ring-0" />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty>No district found.</CommandEmpty>
                          <CommandGroup>
                            {districts.map((district) => (
                              <CommandItem
                                key={district}
                                value={district}
                                onSelect={(currentValue) => {
                                  const newValue = currentValue === shippingDistrict ? "" : currentValue;
                                  setShippingDistrict(newValue);
                                  setShippingThana(""); // Reset thana when district changes
                                  setShippingDistrictOpen(false);
                                }}
                                className="flex items-center justify-between py-2.5 px-4 cursor-pointer data-[selected=true]:bg-primary/5"
                              >
                                {district}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    shippingDistrict === district ? "opacity-100 text-primary" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <Popover open={shippingThanaOpen} onOpenChange={setShippingThanaOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={shippingThanaOpen}
                        disabled={!shippingDistrict}
                        className={cn(
                          "w-full h-[46px] justify-between font-normal border-[#E5E7EB] rounded-[10px] hover:bg-transparent focus:ring-primary/20 focus:border-primary px-4 bg-white text-gray-500",
                          !shippingDistrict && "opacity-50 cursor-not-allowed bg-gray-50"
                        )}
                      >
                        {shippingThana
                          ? shippingThana
                          : shippingDistrict ? "Select Thana (Optional)" : "Select District first"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 shadow-lg rounded-lg overflow-hidden border-gray-100" align="start">
                      <Command className="w-full border-none">
                        <CommandInput placeholder="Search thana..." className="h-10 border-none focus:ring-0" />
                        <CommandList className="max-h-[300px]">
                          <CommandEmpty>No thana found.</CommandEmpty>
                          <CommandGroup>
                            {getThanasForDistrict(shippingDistrict).map((thana) => (
                              <CommandItem
                                key={thana}
                                value={thana}
                                onSelect={(currentValue) => {
                                  setShippingThana(currentValue === shippingThana ? "" : currentValue);
                                  setShippingThanaOpen(false);
                                }}
                                className="flex items-center justify-between py-2.5 px-4 cursor-pointer data-[selected=true]:bg-primary/5"
                              >
                                {thana}
                                <Check
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    shippingThana === thana ? "opacity-100 text-primary" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </div>

                <Textarea id="shipping-address" placeholder="ex: House no. / building / street / area *" className="min-h-[90px] border-[#E5E7EB] rounded-[10px] focus-visible:ring-primary/20 focus-visible:border-primary shadow-none" />
              </div>
            </section>

            {/* Billing Address Section */}
            <section className="bg-white rounded-[10px] border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
              <div
                className="p-6 flex justify-between items-center cursor-pointer group"
                onClick={() => setShowBilling(!showBilling)}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-[3px] h-4 bg-primary rounded-full transition-transform group-hover:scale-y-110" />
                  <h2 className="text-[15px] font-bold text-[#2D333A] uppercase tracking-wide">Billing Address</h2>
                </div>
                <div className={`w-5 h-5 rounded-sm border-2 transition-all flex items-center justify-center ${showBilling ? 'border-primary bg-primary' : 'border-gray-200'}`}>
                  {showBilling && <CheckCircle2 size={12} className="text-white" />}
                </div>
              </div>

              <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showBilling ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 pt-2 space-y-6 border-t border-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                    <Input placeholder="Your Full Name *" className="h-[46px] border-[#E5E7EB] rounded-[10px] focus-visible:ring-primary/20 focus-visible:border-primary shadow-none" />
                    <div className="flex h-[46px] items-center border border-[#E5E7EB] rounded-[10px] overflow-hidden bg-white focus-within:ring-3 focus-within:ring-primary/20 focus-within:border-primary transition-all">
                      <div className="px-3 h-full flex items-center bg-[#F8F9FA] border-r border-[#E5E7EB] text-gray-500 text-[13px] font-medium shrink-0">88</div>
                      <input type="text" placeholder="017********" className="w-full h-full px-4 text-sm focus:outline-none" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <Popover open={billingDistrictOpen} onOpenChange={setBillingDistrictOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={billingDistrictOpen}
                          className="w-full h-[46px] justify-between font-normal border-[#E5E7EB] rounded-[10px] hover:bg-transparent focus:ring-primary/20 focus:border-primary px-4 bg-white text-gray-500"
                        >
                          {billingDistrict
                            ? districts.find((d) => d === billingDistrict)
                            : "Select district *"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 shadow-lg rounded-lg overflow-hidden border-gray-100" align="start">
                        <Command className="w-full border-none">
                          <CommandInput placeholder="Search district..." className="h-10 border-none focus:ring-0" />
                          <CommandList className="max-h-[200px]">
                            <CommandEmpty>No district found.</CommandEmpty>
                            <CommandGroup>
                              {districts.map((district) => (
                                <CommandItem
                                  key={district}
                                  value={district}
                                  onSelect={(currentValue) => {
                                    const newValue = currentValue === billingDistrict ? "" : currentValue;
                                    setBillingDistrict(newValue);
                                    setBillingThana(""); // Reset thana when district changes
                                    setBillingDistrictOpen(false);
                                  }}
                                  className="flex items-center justify-between py-2.5 px-4 cursor-pointer data-[selected=true]:bg-primary/5"
                                >
                                  {district}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      billingDistrict === district ? "opacity-100 text-primary" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    <Popover open={billingThanaOpen} onOpenChange={setBillingThanaOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={billingThanaOpen}
                          disabled={!billingDistrict}
                          className={cn(
                            "w-full h-[46px] justify-between font-normal border-[#E5E7EB] rounded-[10px] hover:bg-transparent focus:ring-primary/20 focus:border-primary px-4 bg-white text-gray-500",
                            !billingDistrict && "opacity-50 cursor-not-allowed bg-gray-50"
                          )}
                        >
                          {billingThana
                            ? billingThana
                            : billingDistrict ? "Select thana *" : "Select district first"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[--radix-popover-trigger-width] p-0 shadow-lg rounded-lg overflow-hidden border-gray-100" align="start">
                        <Command className="w-full border-none">
                          <CommandInput placeholder="Search thana..." className="h-10 border-none focus:ring-0" />
                          <CommandList className="max-h-[200px]">
                            <CommandEmpty>No thana found.</CommandEmpty>
                            <CommandGroup>
                              {getThanasForDistrict(billingDistrict).map((thana) => (
                                <CommandItem
                                  key={thana}
                                  value={thana}
                                  onSelect={(currentValue) => {
                                    setBillingThana(currentValue === billingThana ? "" : currentValue);
                                    setBillingThanaOpen(false);
                                  }}
                                  className="flex items-center justify-between py-2.5 px-4 cursor-pointer data-[selected=true]:bg-primary/5"
                                >
                                  {thana}
                                  <Check
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      billingThana === thana ? "opacity-100 text-primary" : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>

                  <Textarea placeholder="ex: House no. / building / street / area *" className="min-h-[70px] border-[#E5E7EB] rounded-[10px] focus-visible:ring-primary/20 focus-visible:border-primary shadow-none" />
                </div>
              </div>
            </section>

          </div>

          {/* ── RIGHT COLUMN ──────────────────────────────────── */}
          <div className="space-y-6">

            {/* Payment Method Section */}
            <section className="bg-white rounded-[10px] border border-gray-100 shadow-sm overflow-hidden p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-[3px] h-4 bg-primary rounded-full" />
                <h2 className="text-[15px] font-bold text-[#2D333A] uppercase tracking-wide">Payment method</h2>
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div
                    onClick={() => setPaymentMethod("cod")}
                    className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-gray-50 rounded text-blue-500">
                      <Wallet size={18} />
                    </div>
                    <span className="text-[12px] font-bold text-gray-700">Cash On Delivery</span>
                    {paymentMethod === 'cod' && (
                      <CheckCircle2 size={16} className="absolute top-2 right-2 text-primary" />
                    )}
                  </div>
                  <div
                    onClick={() => setPaymentMethod("online")}
                    className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'online' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                  >
                    <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-gray-50 rounded text-blue-600">
                      <CreditCard size={18} />
                    </div>
                    <span className="text-[12px] font-bold text-gray-700">Online Payment</span>
                    {paymentMethod === 'online' && (
                      <CheckCircle2 size={16} className="absolute top-2 right-2 text-primary" />
                    )}
                  </div>
                </div>
                <div
                  onClick={() => setPaymentMethod("bkash")}
                  className={`relative p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center gap-3 ${paymentMethod === 'bkash' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                >
                  <div className="shrink-0 w-8 h-8 flex items-center justify-center bg-pink-50 rounded text-pink-500">
                    <Smartphone size={18} />
                  </div>
                  <span className="text-[12px] font-bold text-gray-700">Bkash</span>
                  {paymentMethod === 'bkash' && (
                    <CheckCircle2 size={16} className="absolute top-2 right-2 text-primary" />
                  )}
                </div>
              </div>
            </section>

            {/* Coupon Section */}
            <div className="bg-white rounded-[10px] border border-gray-100 shadow-sm p-4 flex items-center justify-between cursor-pointer group">
              <span className="text-[14px] font-bold text-gray-700 group-hover:text-primary transition-colors">Have any coupon or gift voucher?</span>
              <Plus size={16} className="text-primary" />
            </div>

            {/* Total Summary */}
            <section className="bg-white rounded-[10px] border border-gray-100 shadow-sm p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-[14px] text-gray-600">
                  <span>Sub total</span>
                  <span className="font-bold text-[#2D333A]">{subTotal.toLocaleString()}.00 BDT</span>
                </div>
                <div className="flex justify-between items-center text-[14px] text-gray-600">
                  <span>Delivery cost</span>
                  <span className="font-bold text-[#2D333A]">{deliveryCost} BDT</span>
                </div>
                <div className="h-px bg-gray-100 my-2" />
                <div className="flex justify-between items-center">
                  <span className="text-[16px] font-bold text-[#2D333A]">Total</span>
                  <span className="text-[16px] font-black text-black">{total.toLocaleString()}.00BDT</span>
                </div>
              </div>
            </section>

            {/* Special Notes Section */}
            <section className="bg-white rounded-[10px] border border-gray-100 shadow-sm overflow-hidden p-6">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-[3px] h-4 bg-primary rounded-full" />
                <h2 className="text-[14px] font-bold text-[#2D333A] tracking-wider uppercase">Special notes <span className="text-[11px] text-gray-400 font-normal lowercase">(Optional)</span></h2>
              </div>
              <Textarea placeholder="Any special instructions for your order..." className="min-h-[100px] focus-visible:ring-primary/20 focus-visible:border-primary" />
            </section>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3 px-1 py-4">
              <div className="pt-0.5">
                <Checkbox id="terms" defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
              </div>
              <Label htmlFor="terms" className="text-[12px] text-gray-600 leading-relaxed cursor-pointer font-normal">
                I have read and agree to the <span className="text-primary font-bold hover:underline cursor-pointer">Terms and Conditions</span>, <span className="text-primary font-bold hover:underline cursor-pointer">Privacy Policy</span> & <span className="text-primary font-bold hover:underline cursor-pointer">Refund and Return Policy</span>.
              </Label>
            </div>

            {/* PLACE ORDER Button */}
            <Button className="w-full h-14 text-[15px] font-bold uppercase tracking-[1px] shadow-lg shadow-primary/20 transition-all hover:scale-[1.01] active:scale-[0.99] rounded-md">
              Place Order
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
}
