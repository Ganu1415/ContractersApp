import React, { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { ArrowLeft, MoreVertical, Pencil, Trash2 } from 'lucide-react-native';

import { AppText } from '../../../components/ui/Text';
import { AppButton } from '../../../components/ui/Button';
import { AppInput } from '../../../components/ui/Input';
import { AppCard } from '../../../components/ui/Card';
import { AppBadge } from '../../../components/ui/Badge';
import { AppIconButton } from '../../../components/ui/IconButton';
import { AppIcon, IconName } from '../../../components/ui/Icon';
import { AppDivider } from '../../../components/ui/Divider';
import { theme } from '../../../theme';
import { AppAvatar } from '../../../components/ui/Avatar';
import { AppCheckbox } from '../../../components/ui/Checkbox';
import { AppRadio } from '../../../components/ui/Radio';
import { AppSwitch } from '../../../components/ui/Switch';
import { AppSelect } from '../../../components/ui/Select';
import { AppModal } from '../../../components/ui/Modal';
import AppBottomSheet from '../../../components/ui/BottomSheet/BottomSheet';
import { AppToast } from '../../../components/ui/Toast';
import { AppAlert } from '../../../components/ui/Alert';
import FormField from '../../../components/form/FormField/FormField';
import { FormInput } from '../../../components/form/FormInput';
import FormSelect from '@ContractorApp/src/components/form/FormSelect/FormSelect';

const LoginScreen = () => {
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    cement: false,
    steel: false,
    bricks: false,
  });
  const [contractType, setContractType] = useState('turnkey');
  const contractTypes = [
    {
      id: 'turnkey',
      label: 'Turnkey',
    },
    {
      id: 'labour',
      label: 'Labour Only',
    },
    {
      id: 'material_labour',
      label: 'Material + Labour',
    },
  ];
  const [enabled, setEnabled] = useState(false);
  const projectTypes = [
    {
      label: 'Residential',
      value: 'residential',
    },
    {
      label: 'Commercial',
      value: 'commercial',
    },
    {
      label: 'Renovation',
      value: 'renovation',
    },
  ];
  const [visible, setVisible] = useState(false);
  interface ProjectAction {
    id: string;
    label: string;
    icon: IconName;
    danger?: boolean;
  }
  const projectActions: ProjectAction[] = [
    {
      id: 'edit',
      label: 'Edit Project',
      icon: 'edit',
    },
    {
      id: 'team',
      label: 'Assign Team',
      icon: 'users',
    },
    {
      id: 'quotation',
      label: 'View Quotation',
      icon: 'file',
    },
    {
      id: 'share',
      label: 'Share Project',
      icon: 'share-2',
    },
    {
      id: 'delete',
      label: 'Delete Project',
      icon: 'delete',
      danger: true,
    },
  ];
  const [toastVisible, setToastVisible] = useState(false);
  return (
    <ScrollView style={{ padding: 24, marginBottom: 24 }}>
      <AppText variant="h1">Contractor App</AppText>
      <AppText variant="body" color="secondary" style={{ marginTop: 8 }}>
        Manage your construction projects.
      </AppText>
      <AppButton
        title="Login"
        variant="outline"
        style={{ marginTop: 24, backgroundColor: 'white' }}
        onPress={() => {
          () => setToastVisible(true);
        }}
      />
      <AppButton title="Create Project" variant="primary" />
      <AppButton title="Cancel" variant="outline" />
      <AppButton title="Delete Project" variant="danger" />
      <AppButton title="Completed" variant="success" />
      <AppButton title="View Details" variant="ghost" />
      //size
      <AppButton title="Small" size="small" />
      <AppButton title="Medium" size="medium" />
      <AppButton title="Large" size="large" />
      //full width
      <AppButton title="Create Quotation" fullWidth />
      //loading
      <AppButton title="Saving..." loading />
      <View>
        <AppText variant="body">APP Inpute</AppText>
        <AppInput
          label="Project Name"
          placeholder="Enter project name"
          required
        />
        <AppInput
          label="Client Name"
          placeholder="Enter client name"
          required
          error="Client name is required"
        />
        <AppInput
          label="Project Code"
          placeholder="e.g. PRJ-001"
          helperText="Use a unique project code"
        />

        <AppInput label="Small" size="small" />

        <AppInput label="Medium" size="medium" />

        <AppInput label="Large" size="large" />
        <AppInput
          label="Password"
          placeholder="Enter password"
          secureTextEntry
        />
        <AppInput
          label="Contract Amount"
          placeholder="Enter amount"
          keyboardType="numeric"
        />
        <AppInput
          label="Scope of Work"
          placeholder="Describe the work..."
          multiline
          numberOfLines={5}
          textAlignVertical="top"
          size="large"
        />
      </View>
      <View>
        <AppCheckbox label="Cement" checked={checked} onChange={setChecked} />
        <AppCheckbox
          label="Cement"
          checked={form.cement}
          onChange={value =>
            setForm({
              ...form,
              cement: value,
            })
          }
        />

        <AppCheckbox
          label="Steel"
          checked={form.steel}
          onChange={value =>
            setForm({
              ...form,
              steel: value,
            })
          }
        />

        <AppCheckbox
          label="Bricks"
          checked={form.bricks}
          onChange={value =>
            setForm({
              ...form,
              bricks: value,
            })
          }
        />
        <AppCheckbox
          label="I agree to the quotation terms"
          checked={false}
          onChange={() => {}}
          error="This field is required"
        />
        <AppCheckbox
          label="Electrical Work"
          checked
          disabled
          onChange={() => {}}
        />
        <AppCheckbox
          label="Select All"
          checked={false}
          indeterminate
          onChange={() => {}}
        />
        <AppCheckbox
          label="Cement"
          checked
          onChange={() => {}}
          rightContent={<AppText variant="bodyMedium">Included</AppText>}
        />
      </View>
      {/* radio */}
      <View>
        <AppRadio
          label="Turnkey"
          selected={contractType === 'turnkey'}
          onChange={() => setContractType('turnkey')}
        />
        <AppRadio
          label="Design and Build"
          selected={contractType === 'design-build'}
          onChange={() => setContractType('design-build')}
        />

        {contractTypes.map(item => (
          <AppRadio
            key={item.id}
            label={item.label}
            selected={contractType === item.id}
            onChange={() => setContractType(item.id)}
          />
        ))}
      </View>
      {/* Switch */}
      <View>
        <AppSwitch
          label="Payment Reminder"
          helperText="Send automatic reminders to clients"
          value={enabled}
          onChange={setEnabled}
        />
        <AppSwitch
          label="Payment Reminder"
          helperText="Send automatic reminders to clients"
          value={enabled}
          onChange={setEnabled}
        />
        <AppSwitch
          label="Auto Generate PDF"
          value={enabled}
          disabled
          onChange={() => {}}
        />
        <AppSwitch
          label="Project Active"
          value={enabled}
          loading
          onChange={() => {}}
        />
      </View>
      {/* select */}
      <View>
        <AppSelect
          label="Project Type"
          options={projectTypes}
          value={form.projectType}
          onChange={value =>
            setForm({
              ...form,
              projectType: value,
            })
          }
        />
      </View>
      {/* Alert */}
      <AppAlert
        visible={toastVisible}
        title="Login Failed"
        message="Invalid username or password"
        type="error"
        onConfirm={() => setToastVisible(false)}
      />
      {/* AppBottomSheet */}
      <View>
        <AppBottomSheet
          visible={visible}
          onClose={() => setVisible(false)}
          title="Project Actions"
        >
          <AppText>Select an action</AppText>
        </AppBottomSheet>
        {projectActions.map(action => (
          <Pressable key={action.id} onPress={() => action.id}>
            {/* <AppIcon
              name="{action.icon}"
              size="medium"
              color={action.danger ? 'error' : 'text'}
            /> */}

            <AppText>{action.label}</AppText>
          </Pressable>
        ))}
      </View>
      {/* Tost */}
      <AppToast
        visible={toastVisible}
        message="Project created successfully"
        type="success"
        onHide={() => setToastVisible(false)}
      />
      {/* modal */}
      <View>
        <AppModal
          visible={visible}
          onClose={() => setVisible(false)}
          title="Modal Title"
          subtitle="Modal Subtitle"
        >
          <AppText>Modal Content</AppText>
        </AppModal>
        <AppModal
          visible={visible}
          onClose={() => false}
          title="Delete Project"
          subtitle="This action cannot be undone."
          size="small"
          footer={
            <View
              style={{
                flexDirection: 'row',
                gap: 12,
              }}
            >
              <AppButton
                title="Cancel"
                variant="outline"
                onPress={() => false}
                style={{ flex: 1 }}
              />

              <AppButton
                title="Delete"
                variant="danger"
                onPress={e => {}}
                style={{ flex: 1 }}
              />
            </View>
          }
        >
          <AppText>Are you sure you want to delete this project?</AppText>
        </AppModal>
        <AppModal
          visible={visible}
          onClose={() => setVisible(false)}
          title="Project Actions"
          position="bottom"
        >
          <AppButton title="Edit Project" onPress={() => {}} />

          <AppButton title="Duplicate Project" onPress={() => {}} />

          <AppButton
            title="Delete Project"
            variant="danger"
            onPress={() => {}}
          />
        </AppModal>
        <AppModal
          visible={visible}
          onClose={() => {}}
          title="Saving Quotation"
          loading
          closeOnBackdropPress={false}
          closeOnBackButton={false}
        >
          <AppText>Please wait...</AppText>
        </AppModal>
      </View>
      {/* //iconbutton */}
      <View>
        <AppIconButton
          icon={<AppIcon name="edit" size="medium" color="primary" />}
          accessibilityLabel="Edit project"
          onPress={() => {
            console.log('Edit project pressed');
          }}
        />
        <AppIconButton
          icon={<AppIcon name="delete" size="medium" color="error" />}
          variant="ghost"
          accessibilityLabel="Delete project"
          onPress={() => {
            console.log('Delete project pressed');
          }}
        />
        <AppIconButton
          icon={<AppIcon name="arrow-left" size="medium" color="primary" />}
          variant="ghost"
          accessibilityLabel="Go back"
          onPress={() => {
            console.log('Go back pressed');
          }}
        />
        <AppIconButton
          icon={<AppIcon name="more" size="medium" color="primary" />}
          variant="ghost"
          accessibilityLabel="More options"
          onPress={() => {
            console.log('More options pressed');
          }}
        />
      </View>
      {/* <AppDivider /> */}
      <View>
        <AppDivider />
        <AppDivider color={theme.colors.primary} />
        <AppDivider thickness={2} />
        <AppDivider spacing="small" />

        <AppDivider spacing="medium" />

        <AppDivider spacing="large" />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <AppButton title="Edit" variant="ghost" />

          <AppDivider orientation="vertical" spacing="large" />

          <AppButton title="Delete" variant="ghost" />
        </View>
      </View>
      {/* AppAvatar */}
      <View>
        <AppAvatar uri="https://example.com/user.jpg" name="Rahul Sharma" />
        <AppAvatar name="Rahul Sharma" />
        <AppAvatar name="Rahul Sharma" size="small" />

        <AppAvatar name="Rahul Sharma" size="medium" />

        <AppAvatar name="Rahul Sharma" size="large" />

        <AppAvatar name="Rahul Sharma" size="xlarge" />
        <AppAvatar name="Rahul Sharma" status="online" showStatus />
        <AppAvatar name="Rahul Sharma" status="busy" showStatus />
        <AppAvatar name="Rahul Sharma" status="away" showStatus />
        <AppAvatar name="Rahul Sharma" status="offline" showStatus />
      </View>
      {/* //appbadge */}
      <View>
        <AppBadge label="Default" variant="default" />

        <AppBadge label="Primary" variant="primary" />

        <AppBadge label="Active" variant="success" />

        <AppBadge label="Pending" variant="warning" />

        <AppBadge label="Rejected" variant="error" />

        <AppBadge label="Information" variant="info" />
      </View>
      //appcard
      <View>
        <AppCard>
          <AppText variant="h3">Green Villa</AppText>

          <AppText color="secondary">Mumbai</AppText>
        </AppCard>
        <AppCard variant="elevated" padding="medium" radius="large">
          <AppText variant="h3">Green Villa</AppText>

          <AppText variant="bodySmall" color="secondary">
            Client: Rahul Sharma
          </AppText>

          <AppText variant="bodyMedium" style={{ marginTop: 12 }}>
            ₹48,00,000
          </AppText>
        </AppCard>
        <AppCard
          variant="outlined"
          onPress={() => {
            console.log('Project opened');
          }}
        >
          <AppText variant="h3">Green Villa</AppText>
        </AppCard>
        <AppCard variant="default">...</AppCard>

        <AppCard variant="outlined">...</AppCard>

        <AppCard variant="elevated">...</AppCard>

        <AppCard variant="filled">...</AppCard>
      </View>
      {/* FormField */}
      <FormField
        label="Project Name"
        required
        helperText="Enter the official project name"
      >
        <AppInput
          placeholder="Enter project name"
          value={'projectName'}
          onChangeText={e => {}}
        />
      </FormField>
      <FormInput
        label="Project Name "
        required
        placeholder="Enter project name"
        value={'projectName input'}
        onChangeText={e => {}}
        helperText="Enter the official project name"
      />
      <FormSelect
        label="Project Type"
        required
        placeholder="Select project type"
        value={'projectType'}
        onChange={e => {}}
        options={[
          {
            label: 'Residential',
            value: 'residential',
          },
          {
            label: 'Commercial',
            value: 'commercial',
          },
          {
            label: 'Renovation',
            value: 'renovation',
          },
        ]}
      />
    </ScrollView>
  );
};

export default LoginScreen;
