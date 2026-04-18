"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Shield, Bell, Palette, Save, Upload, Key, Monitor, Globe, Clock } from "lucide-react";

function Toggle({ defaultChecked = false, label }: { defaultChecked?: boolean; label: string }) {
  return (
    <label className="flex items-center justify-between py-2 cursor-pointer">
      <span className="text-sm">{label}</span>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-5 w-9 rounded-full appearance-none bg-border/40 checked:bg-primary relative cursor-pointer after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all checked:after:left-[calc(100%-1.125rem)]" />
    </label>
  );
}

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold tracking-[-0.02em]">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences.</p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList className="bg-secondary/40 border border-border/30">
          <TabsTrigger value="profile" className="text-xs cursor-pointer"><User className="h-3 w-3 mr-1" /> Profile</TabsTrigger>
          <TabsTrigger value="security" className="text-xs cursor-pointer"><Shield className="h-3 w-3 mr-1" /> Security</TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs cursor-pointer"><Bell className="h-3 w-3 mr-1" /> Notifications</TabsTrigger>
          <TabsTrigger value="preferences" className="text-xs cursor-pointer"><Palette className="h-3 w-3 mr-1" /> Preferences</TabsTrigger>
        </TabsList>

        {/* Profile */}
        <TabsContent value="profile" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">JD</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm" className="cursor-pointer text-xs"><Upload className="h-3 w-3 mr-1" /> Upload Photo</Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Full Name</Label>
                  <Input defaultValue="John Doe" className="bg-background/50 border-border/40" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Email</Label>
                  <Input defaultValue="john@example.com" disabled className="bg-background/30 border-border/30" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Company</Label>
                  <Input placeholder="Your company name" className="bg-background/50 border-border/40" />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Role</Label>
                  <Input placeholder="Your role" className="bg-background/50 border-border/40" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer"><Save className="h-4 w-4 mr-2" /> Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="mt-6 space-y-4">
          <Card className="border-border/30 bg-card/60">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-semibold">Change Password</CardTitle></CardHeader>
            <CardContent className="p-6 pt-2 space-y-4">
              <div className="space-y-2"><Label className="text-sm">Current Password</Label><Input type="password" className="bg-background/50 border-border/40" /></div>
              <div className="space-y-2"><Label className="text-sm">New Password</Label><Input type="password" className="bg-background/50 border-border/40" /></div>
              <div className="space-y-2"><Label className="text-sm">Confirm New Password</Label><Input type="password" className="bg-background/50 border-border/40" /></div>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer"><Key className="h-4 w-4 mr-2" /> Update Password</Button>
            </CardContent>
          </Card>
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 flex items-center justify-between">
              <div><p className="text-sm font-semibold">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add extra security to your account.</p></div>
              <Button variant="outline" size="sm" className="cursor-pointer text-xs">Enable 2FA</Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-1">
              <Toggle label="Agent status changes" defaultChecked />
              <Separator className="bg-border/15" />
              <Toggle label="Usage limit warnings" defaultChecked />
              <Separator className="bg-border/15" />
              <Toggle label="Billing notifications" defaultChecked />
              <Separator className="bg-border/15" />
              <Toggle label="Product updates" />
              <Separator className="bg-border/15" />
              <Toggle label="Weekly performance digest" defaultChecked />
              <Separator className="bg-border/15" />
              <Toggle label="Marketing emails" />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="mt-6">
          <Card className="border-border/30 bg-card/60">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" /> Language</Label>
                <select className="w-full h-9 rounded-md border border-border/40 bg-background/50 px-3 text-sm">
                  <option>English</option><option>Türkçe</option><option>Azərbaycan</option><option>Русский</option><option>Deutsch</option><option>Français</option><option>Español</option><option>العربية</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Timezone</Label>
                <select className="w-full h-9 rounded-md border border-border/40 bg-background/50 px-3 text-sm">
                  <option>UTC</option><option>America/New_York</option><option>Europe/London</option><option>Europe/Istanbul</option><option>Asia/Tokyo</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-medium flex items-center gap-1.5"><Monitor className="h-3.5 w-3.5" /> Theme</Label>
                <select className="w-full h-9 rounded-md border border-border/40 bg-background/50 px-3 text-sm">
                  <option>Dark</option><option>Light</option><option>System</option>
                </select>
              </div>
              <Button className="bg-primary hover:bg-primary/90 cursor-pointer"><Save className="h-4 w-4 mr-2" /> Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
